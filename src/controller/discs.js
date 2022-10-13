const services = require("../services/discs");
const imgs = require("../services/img");

const postDisc = async (req, res) => {
    const userId = req.user.id;
    const discInfos = req.body;
    //discGenres

    try {
        // chamada de serviço, retorna um {error: , response: }
        const discRes = await services.registerUserDisc(
            userId,
            discInfos,
            req.files
        );
        // checa por erro, e manda para o catch
        if (discRes.error) throw discRes.error;

        return res.status(201).json();
    } catch (err) {
        // pesquisar middleware para tratamento de erros do nodejs
        // https://masteringjs.io/tutorials/express/error-handling

        if (err === "Nome do album necessário")
            return res.status(400).json({ message: err });
        if (err === "Nome do artista necessário")
            return res.status(400).json({ message: err });
        if (err === "Data de lançamente necessária")
            return res.status(400).json({ message: err });

        //caso o erro não bata com nenhum erro esperado, envia erro de servidor
        return res.status(500).json({ message: err });
    }
};

const getUserDiscs = async (req, res) => {
    const userId = req.params.id;
    try {
        const userDiscs = await services.userDiscs(userId);
        if (userDiscs.error) throw userDiscs.error;

        return res.status(200).json(userDiscs.result);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const filterByGenre = async (req, res) => {
    const genre = req.params.genre.trim();
    console.log(genre);
    try {
        const discRes = await services.filterByGenre(genre);
        if (discRes.error) throw discRes.error;

        return res.status(200).json(discRes.result);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const generalFilter = async (req, res) => {
    const searchString = req.params.search;
    const offset = req.params.offset;
    console.log(offset);
    const barFilter = {
        album: [searchString],
        artist: [searchString]
    };
    try{
        const searchRes = await services.filter(barFilter,offset)
        if (searchRes.error) throw searchRes.error;

        return res.status(200).json(searchRes.result);
    }catch(err) {
        console.log(err);
        return res.status(500).json({message: err})
    }
}
const getUserDiscByAlbum = async (req, res) => {
    const albumName = req.body.album;
    const userId = req.user.id;
    try {
        const discRes = await services.getUserDisc(userId, albumName);
        if (discRes.error) throw discRes.error;

        return res.status(200).json(discRes.result);
    } catch (err) {
        if (err === "Necessário informar nome do album")
            return res.status(400).json({ message: err });
        if (err === "Disco não encontrado")
            return res.status(404).json({ message: err });
        return res.status(500).json({ message: err });
    }
};

const getDisc = async (req, res) => {
    const discId = req.params.id;
    try {
        const discRes = await services.getDisc(discId);
        if (discRes.error) throw discRes.error;
        res.status(200).json(discRes.result);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const updateDisc = async (req, res) => {
    const discId = req.params.id;
    const discInfos = req.body;
    const discGenres = discInfos.genre;

    try {
        if (req.file) {
            if (discInfos.img) imgs.removeImg(`discs/${discInfos.img}`);
            discInfos.img = req.file.filename;
        }
        const discRes = await services.putDisc(discInfos, discId);
        if (discRes.error) throw discRes.error;

        return res.status(200).json({ message: "disco alterado" });
    } catch (err) {
        if (err === "Nome do album necessário")
            return res.status(400).json({ message: err });
        if (err === "Nome do artista necessário")
            return res.status(400).json({ message: err });
        if (err === "Data de lançamente necessária")
            return res.status(400).json({ message: err });

        // caso nenhum erro previsto ocorra
        return res.status(500).json({ message: err });
    }
};

const filter = async (req, res) => {
    const filterInfos = req.body;
    const offset = req.params.offset;

    try {
        const filterRes = await services.filter(filterInfos, offset);
        if (filterRes.error) throw filterRes.error;

        return res.status(200).json(filterRes.result);
    } catch (err) {
        if (err === "Atributo inválido")
            return res.status(400).json({ message: err });
        if (err === "Informar filtro")
            return res.status(400).json({ message: err });

        console.log(err);
        return res.status(500).json({ message: err });
    }
};

const deleteDisc = async (req, res) => {
    const discId = req.params.id;
    const userId = req.user.id;

    try {
        //pegando informações de disco
        const discRes = await services.getDisc(discId);
        if (discRes.error) throw discRes.error;

        const disc = discRes.result;
        // comparando se o usuário é dono do disco
        console.log(disc.user_id    );
        console.log(userId);
        console.log(disc!== userId);
        if (disc[0].user_id !== userId) throw "Disco não pertence ao usuário";
        const deleteRes = await services.deleteDisc(discId);
        if (deleteRes.error) throw deleteRes.error;

        return res.status(200).json({ message: "Disco deletado" });
    } catch (err) {
        if (err === "Disco não encontrado") return res.json(404).json();
        if (err === "Disco não pertence ao usuário")
            return res.status(403).json({ message: err });

        // se o erro não for reconhecido:
        return res.status(500).json({ message: err });
    }
};
const getAllDiscs = async (req, res) => {
    const offset = req.params.offset;
    try {
        const discRes = await services.getAllDiscs(offset);
        if (discRes.error) throw discRes.error;

        res.status(200).json(discRes.result);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const getAllDiscsButOwners = async (req, res) => {
    const offset = req.params.offset;
    try {
        const discRes = await services.getAllDiscsButOwners(
            req.user.id,
            offset
        );
        if (discRes.error) throw discRes.error;

        res.status(200).json(discRes.result);
    } catch (err) {
        return res.status(500).jsno({ message: err });
    }
};

module.exports = {
    postDisc,
    getDisc,
    updateDisc,
    deleteDisc,
    filter,
    getUserDiscByAlbum,
    getAllDiscs,
    getAllDiscsButOwners,
    filterByGenre,
    getUserDiscs,
    generalFilter,
};
