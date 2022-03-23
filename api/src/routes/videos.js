const {Router} = require('express');
const {
    addVideo,
    getVideos
} = require('../controllers/videoController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/',
    auth,
    addVideo
)

router.get('/',
    auth,
    getVideos
)

module.exports = router;
