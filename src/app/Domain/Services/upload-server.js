const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './src/assets/images/talleres';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  res.send({
    message: 'Archivo subido con éxito',
    path: `assets/images/talleres/${req.file.filename}`,
  });
});

app.post('/save-workshop', (req, res) => {
  // Ajustamos el path para llegar a Data/workshops.ts desde Domain/Services
  const filePath = path.join(__dirname, '../../../app/Data/workshops.ts');
  const newWorkshop = req.body;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lastIndex = content.lastIndexOf('];');

    if (lastIndex === -1) {
      return res.status(500).send('No se pudo encontrar el final del array en workshops.ts');
    }

    // Convert to TypeScript-style object literal (no quotes on keys)
    let workshopString = JSON.stringify(newWorkshop, null, 2);
    workshopString = workshopString.replace(/"(\w+)":/g, '$1:');

    // Logic to properly insert with commas
    let trimmedContent = content.slice(0, lastIndex).trimEnd();
    
    // If the array already has objects, we need a comma
    const needsComma = trimmedContent.endsWith('}') || trimmedContent.endsWith(']');
    const prefix = needsComma ? ',\n  ' : '\n  ';

    const finalContent = trimmedContent + prefix + workshopString + '\n];\n';

    fs.writeFileSync(filePath, finalContent, 'utf8');
    res.send({ message: 'Taller persistido con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al persistir el taller: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor de desarrollo activo en http://localhost:${port}`);
});
