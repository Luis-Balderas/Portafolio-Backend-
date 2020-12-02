const MongoLib = require('../lib/mongo');

class PoemasService {
  constructor() {
    this.collection = 'poemas';
    this.mongoDB = new MongoLib();
  }
  async getPoemas({ tags }) {
    const query = tags && {
      tags: {
        $in: tags,
      },
    };
    const poemas = await this.mongoDB.getAll(this.collection, query);
    return poemas || [];
  }

  async getPoema({ poemaId }) {
    const poema = await this.mongoDB.get(this.collection, poemaId);
    return poema || {};
  }

  async createPoema({ poema }) {
    const newPoema = {
      ...poema,
      createdAt: Date.now(),
    };
    const createPoemaId = await this.mongoDB.create(this.collection, newPoema);
    return createPoemaId;
  }

  async updatePoema({ poemaId, poema }) {
    const updatedPoemaId = await this.mongoDB.update(
      this.collection,
      poemaId,
      poema
    );
    return updatedPoemaId;
  }

  async deletePoema(poemaId) {
    const deletedPoemaId = await this.mongoDB.delete(this.collection, poemaId);
    return deletedPoemaId;
  }
}

module.exports = PoemasService;