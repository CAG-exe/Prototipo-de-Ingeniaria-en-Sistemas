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
    const dir = './public/images/talleres';
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
    path: `/images/talleres/${req.file.filename}`,
  });
});

app.post('/save-workshop', (req, res) => {
  const filePath = path.join(__dirname, '../../../app/Data/workshops.ts');
  
  try {
    const newWorkshop = req.body;
    let content = fs.readFileSync(filePath, 'utf8');
    const lastIndex = content.lastIndexOf('];');

    if (lastIndex === -1) {
      return res.status(500).send('No se pudo encontrar el final del array en workshops.ts');
    }

    // Ensure image path is correct (relative to public)
    if (newWorkshop.imagen && !newWorkshop.imagen.startsWith('http') && !newWorkshop.imagen.startsWith('/')) {
        newWorkshop.imagen = '/' + newWorkshop.imagen;
    }

    // Format object as clean TypeScript (no quotes on keys, trailing commas)
    let workshopString = JSON.stringify(newWorkshop, null, 2);
    workshopString = workshopString.replace(/"(\w+)":/g, '$1:'); // Remove quotes from keys
    workshopString = workshopString.replace(/"/g, "'"); // Use single quotes for values
    
    let trimmedContent = content.slice(0, lastIndex).trimEnd();
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
