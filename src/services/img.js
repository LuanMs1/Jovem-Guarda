async function removeImg(path){
    path = `public/uploads/${path}`
    try{
        await fs.unlink(path);
        return {error: null, result: 'deletado'};
    }catch(err){
        console.log(err);
        return {error: err, result: null}
    }
}

module.exports = {removeImg};