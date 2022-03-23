const Video = require('../models/video');

exports.addVideo = async (req, res) => {
    
    const {url, title} = req.body;

    if(req.usuario.role !== 'admin'){
        res.status(401).json({msg: 'Usuario no autorizado'})
    }

    try{

        const video = await new Video({
            url,
            title
        })
        video.save()

        res.json({creado: true, msg: 'Se agrego el video corectamente', video})
    }
    catch(err){
        console.log(err);
        res.status(400).json({ msg: 'Hubo un error' });
    }
}

exports.getVideos = async (req, res) => {

    if(req.usuario.role !== 'admin'){
        res.status(401).json({msg: 'Usuario no autorizado'})
    }

    try{

        const videos = await Video.find();

        res.json(videos);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ msg: 'Hubo un error' });
    }
}