const Bean = require('../models/Bean');
const { success, error } = require('../utils/response')

const createBean = async (req, res) => {

    const { name, price, description, category } = req.body;
    console.log(name, price, description, category);
    try {
        const existingBean = await Bean.findOne
            ({ name });

        if (existingBean) {
            return res.send(error(res
                , "Bean already exists"));
        }
        const bean = await Bean.create
            ({ name, price, description, category });
        return res.send(success(res, bean, "Bean created successfully"));
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getBeans = async (req, res) => {

    try {
        const beans = await Bean.find();
        return res.send(success(res, beans, "Beans fetched successfully"));
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { createBean, getBeans };