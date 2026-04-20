import { IUser } from "../Domain/Interfaces/IUser";


export const USERS_MOCK: IUser[] = [
  {
    id: 1,
    name: 'Bruno',
    email: 'admin@admin.com',
    movil: '1134567890',
    password: 'admin1',
    enable: true,
    workshops: [1, 2]
  },
  {
    id: 2,
    name: 'María González',
    email: 'maria.gonzalez@gmail.com',
    movil: '1149876543',
    password: '123456',
    enable: true,
    workshops: [2, 3]
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@gmail.com',
    movil: '1161122233',
    password: '123456',
    enable: false,
    workshops: [1]
  },
  {
    id: 4,
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@gmail.com',
    movil: '1177788899',
    password: '123456',
    enable: true,
    workshops: [3, 4]
  },
  {
    id: 5,
    name: 'Sofía Martínez',
    email: 'sofia.martinez@gmail.com',
    movil: '1155556666',
    password: '123456',
    enable: true,
    workshops: [1, 4, 5]
  }
];
