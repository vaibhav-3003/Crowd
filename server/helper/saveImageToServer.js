import cloudinary from 'cloudinary'

function saveImageToServer(files) {
  return new Promise((resolve, reject) => {
    const promises = [];

    // Loop through each file and upload it to Cloudinary
    for (const file of files) {
      const promise = new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        });
      });

      promises.push(promise);
    }

    // Wait for all promises to resolve and return the image URLs
    Promise.all(promises)
      .then((urls) => resolve(urls))
      .catch((err) => reject(err));
  });
}

export default saveImageToServer
