import express from 'express';
import { upload, fileSaves, LikeSave, deleteFile, removeteFile, getFilesByLikesController, searchFilesByNameController } from '../controllers/filesController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();  

//no ocupa cuenta-----------------------------------------------------------
router.post('/like', LikeSave);

router.get('/likes', getFilesByLikesController);

router.get('/search', searchFilesByNameController);
// reportes
//descargar archivos

//ocupa cuenta-----------------------------------------------------------------------
router.post('/save', authenticateToken, upload.array('files'), fileSaves);


//administrador -------------------------------------------------------------------
//mostrar todo los archivos reportados
router.post('/deleta', deleteFile);
//dar de alta los archivos de nuevo 

router.post('/remove', removeteFile); // que tambien se elimine el archivo de la carpeta






export default router;