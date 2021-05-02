const crypto = require("crypto");
const fs = require("fs");

class Users {
  constructor(file) {
    // Check if the filename
    if (!file) throw new Error("File name not provided");
    else this.file = file;

    try {
      fs.accessSync(this.file);
    } catch (err) {
      fs.writeFileSync(this.file, "[]");
    }
  }

  // getAll method
  async getAll() {
    const data = await fs.promises.readFile(this.file, {
      encoding: "utf8",
    });
    return JSON.parse(data);
  }

  // Creating a new record
  async createNewRecord(newRecord) {
    const prevRecords = await this.getAll();
    newRecord.id = crypto.randomBytes(4).toString("hex");
    const updatedRecords = [...prevRecords, newRecord];

    await fs.promises.writeFile(
      this.file,
      JSON.stringify(updatedRecords, null, 2)
    );
    return newRecord;
  }

  // Get a particular record
  async getRecord(id) {
    const prevRecords = await this.getAll();
    const foundRecord = prevRecords.find((record) => record.id === id);

    return foundRecord;
  }

  // Delete a record with an id
  async deleteRecord(id) {
    const prevRecords = await this.getAll();

    await fs.promises.writeFile(
      this.file,
      JSON.stringify(
        prevRecords.filter((record) => record.id !== id),
        null,
        2
      )
    );
  }

  // Update a record with an id
  async updateRecords(id, newRecord) {
    const allRecords = await this.getAll();
    const foundRecord = allRecords.find((record) => record.id === id);

    if (!foundRecord) throw new Error("not found");

    Object.assign(foundRecord, newRecord);
    await fs.promises.writeFile(this.file, JSON.stringify(allRecords, null, 2));
  }

  // get a record by one of the fields
  async getOneBy(obj) {
    const allRecords = await this.getAll();

    for (let record of allRecords) {
      let found = true;

      // if even one the key in that object doesn't show up in the actual record
      for (let key in obj) {
        if (obj[key] !== record[key]) found = false;
      }

      if (found) return record;
    }
  }
}

module.exports = new Users("UserDB.json");
