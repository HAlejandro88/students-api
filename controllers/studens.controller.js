const Student = require('../models/students')
const {Op} = require('sequelize')

exports.getStudents = async(req,res) => {
    let search = req.query.search
    let marksLow = parseFloat(req.query.marksLow)
    let marksHigh = parseFloat(req.query.marksHigh)
    
    let whereClause = {}

    if(isNaN(marksHigh) && isNaN(marksLow) && search === undefined) {
        whereClause = {}
        console.log('entro aqui');
    }

    if(isNaN(marksHigh) && isNaN(marksLow) && search !== undefined) {
        whereClause.name = {
            [Op.like]: '%'+search+'%'
        }
    }

    if(!isNaN(marksHigh) && !isNaN(marksLow) && search === undefined) {
        whereClause.marks = {
            [Op.and]: {
                [Op.gt]: marksLow,
                [Op.lt]: marksHigh
            }
        }
    }

    if( !isNaN(marksHigh) && !isNaN(marksLow) && search !== undefined) {
        whereClause = {
            name: {
                [Op.like]: `%${search}%` 
            },
            marks: {
                [Op.and]: {
                    [Op.gt]: marksLow,
                    [Op.lt]: marksHigh
                }
            }
        }
    }

    if ((!marksLow && marksHigh)|| (marksLow && !marksHigh)) {
        return res.status(400).json({ msg: 'Error: uno de los dos está vacío' });
    } 

    
    try {
        const users = await Student.findAll({
            where: whereClause,
            raw: true
        })
        
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({success: false})
    }
}