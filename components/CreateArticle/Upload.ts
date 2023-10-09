// // api/upload.js
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs';

// export default async function handler(req: any, res: any) {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = path.join(process.cwd(), 'public/uploads');
//     form.keepExtensions = true;

//     form.parse(req, async (err: any, fields: any, files: any) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error uploading file.' });
//         }

//         const filePath = files.file.path;
//         const fileName = path.basename(filePath);
//         const publicPath = `/uploads/${fileName}`;

//         // Move the uploaded file to the public/uploads directory
//         fs.renameSync(filePath, path.join(form.uploadDir, fileName));

//         res.status(200).json({ url: publicPath });
//     });
// }
