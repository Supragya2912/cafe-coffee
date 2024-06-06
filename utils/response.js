const success = (res, data, message) => {
    res.status(200).json({
        message,
        data
    });
}

const error = (res, message) => {
    res.status(500).json({
        message
    });
}

module.exports = { success, error };