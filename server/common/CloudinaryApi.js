require('dotenv').config()
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

module.exports = class CloudinaryApi {

    constructor() {
        this.cloudinary = cloudinary
    }

    async getPlayListStickerUrl(playlistId) {
        return new Promise((resolve, reject) => {
            cloudinary.v2.search
                .expression('resource_type:image AND public_id:stickers/' + playlistId)
                .sort_by('public_id', 'desc')
                .max_results(1)
                .execute()
                .then(result => {
                    // console.log(result)
                    if (0 == result.total_count) {
                        resolve('')
                        return
                    }
                    resolve(result.resources[0].secure_url)
                })
                .catch(err => {
                    console.log(err)
                    resolve('') // 多分これでAPI制限に引っかかってもブランクが返るはず
                });
        })
    }

}
