const MongoLib = require('../lib/mongo');

class FotosService {
  constructor() {
    this.collection = 'fotos';
    this.mongoDB = new MongoLib();
  }
  async getFotos({ tags }) {
    const query = tags && {
      tags: {
        $in: tags,
      },
    };
    const fotos = await this.mongoDB.getAll(this.collection, query);
    return fotos || [];
  }

  async getFoto({ fotoId }) {
    const foto = await this.mongoDB.get(this.collection, fotoId);
    return foto || {};
  }

  async createFoto({ foto }) {
    const newFoto = {
      ...foto,
      createdAt: Date.now(),
    };
    const createFotoId = await this.mongoDB.create(this.collection, newFoto);
    return createFotoId;
  }

  async updateFoto({ fotoId, foto }) {
    const updatedFotoId = await this.mongoDB.update(
      this.collection,
      fotoId,
      foto
    );
    return updatedFotoId;
  }

  async deleteFoto(fotoId) {
    const deletedFotoId = await this.mongoDB.delete(this.collection, fotoId);
    return deletedFotoId;
  }
}

module.exports = FotosService;