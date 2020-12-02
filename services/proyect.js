const MongoLib = require('../lib/mongo');

class ProyectsService {
  constructor() {
    this.collection = 'proyects';
    this.mongoDB = new MongoLib();
  }
  async getProyects({ tags }) {
    const query = tags && {
      tags: {
        $in: tags,
      },
    };
    const proyects = await this.mongoDB.getAll(this.collection, query);
    return proyects || [];
  }

  async getProyect({ proyectId }) {
    const proyect = await this.mongoDB.get(this.collection, proyectId);
    return proyect || {};
  }

  async createProyect({ proyect }) {
    const newProyect = {
      ...proyect,
      createdAt: Date.now(),
    };
    const createProyectId = await this.mongoDB.create(this.collection, newProyect);
    return createProyectId;
  }

  async updateProyect({ proyectId, proyect }) {
    const updatedProyectId = await this.mongoDB.update(
      this.collection,
      proyectId,
      proyect
    );
    return updatedProyectId;
  }

  async deleteProyect(proyectId) {
    const deletedProyectId = await this.mongoDB.delete(this.collection, proyectId);
    return deletedProyectId;
  }
}

module.exports = ProyectsService;