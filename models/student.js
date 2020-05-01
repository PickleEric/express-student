module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    // create the tables in the database, force is true - it will update the database
    Student.sync( {force: false} ).then( () => {
        console.log("Synced student table")
    }) 

    return Student // returns our student model
}