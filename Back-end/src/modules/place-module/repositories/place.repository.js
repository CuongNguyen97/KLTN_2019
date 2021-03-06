import PlaceSchema from '../models/place.model';
import PlaceAccountSchema from '../models/place-account.model';

const isExistPlace = async (name) => {
    const result = await PlaceSchema.findOne({ name });
    return result;
};
const create = async (data) => {
    const result = await PlaceSchema.create(data);
    return result;
};
const getPlaces = async () => {
    const result = await PlaceSchema.find({ isDeleted: false });
    return result;
};
const getPlace = async (placeId) => {
    const result = await PlaceSchema.findOne({ _id: placeId, isDeleted: false });
    return result;
};
const updatePlace = async (placeId, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { ...data });
    if (result.n === result.nModified) return true;
    return false;
};
const deletePlace = async (placeId) => {
    const result = await PlaceSchema.updateOne(
        {
            _id: placeId
        },
        { isDeleted: true }
    );
    if (result.n === result.nModified) return true;
    return false;
};
const existed = async (placeId, accountId) => {
    const result = await PlaceAccountSchema.findOne({
        placeId,
        accountId,
        isDeleted: false
    });
    return result;
};
const createCom = async (data) => {
    const result = await PlaceAccountSchema.create(data);
    return result;
};

const countRating = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: { $ne: null },
            isDeleted: false
        }
    ).count();
    return result;
};
const countRating1 = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: '1',
            isDeleted: false
        }
    ).count();
    return result;
};
const countRating2 = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: '2',
            isDeleted: false
        }
    ).count();
    return result;
};
const countRating3 = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: '3',
            isDeleted: false
        }
    ).count();
    return result;
};
const countRating4 = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: '4',
            isDeleted: false
        }
    ).count();
    return result;
};
const countRating5 = async (placeId) => {
    const result = await PlaceAccountSchema.find(
        {
            placeId,
            rating: '5',
            isDeleted: false
        }
    ).count();
    return result;
};
const sumRating = async (placeId) => {
    const result = await PlaceAccountSchema.aggregate([
        {
            $match: {
                $and: [
                    { placeId: { $eq: placeId } },
                    { rating: { $ne: null } }
                ]
            }
        },
        {
            $group: {
                _id: null,
                totalValue: {
                    $sum: '$rating'
                }
            }
        }
    ]);
    return result;
};
const insertImage = async (placeId, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { $push: { images: data } });
    if (result.n === result.nModified) return true;
    return false;
};
const updateImage = async (placeId, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { images: data });
    if (result.n === result.nModified) return true;
    return false;
};
const updateSingle = async (placeId, oldImage, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false,
        images: oldImage
    },
        { $set: { 'images.$': data } });
    if (result.n === result.nModified) return true;
    return false;
};
const insertMulti = async (placeId, data) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { $push: { images: data } });
    if (result.n === result.nModified) return true;
    return false;
};
const getListWithHobbies = async (destinationId, hobbies) => {
    const result = await PlaceSchema.find({
        isDeleted: false,
        destinationId,
        category: [hobbies, '2']
    });
    return result;
};
const getPlacesOfDes = async (destinationId) => {
    const result = await PlaceSchema.find({
        isDeleted: false,
        destinationId
    });
    return result;
};
const getPlaces3 = async (destinationId) => {
    const result = await PlaceSchema.find({
        isDeleted: false,
        destinationId,
        category: '3'
    });
    return result;
};
const getPlaces2 = async (destinationId) => {
    const result = await PlaceSchema.find({
        isDeleted: false,
        destinationId,
        category: '2'
    });
    return result;
};
const createRating = async (data) => {
    const result = await PlaceAccountSchema.create(data);
    return result;
};
const updateRating = async (placeId, accountId, rating) => {
    const result = await PlaceAccountSchema.updateOne({
        placeId,
        accountId,
        isDeleted: false
    },
        { rating });
    return result;
};
const updateRate = async (placeId, rate) => {
    const result = await PlaceSchema.updateOne({
        _id: placeId,
        isDeleted: false
    },
        { rate });
    return result;
};
const getComment = async (placeId) => {
    const result = await PlaceAccountSchema.find({
        placeId,
        comment: { $ne: null },
        isDeleted: false
    }).populate({ path: 'accountId', select: 'name avatar -_id' });
    return result;
};
const getRate = async (placeId) => {
    const result = await PlaceSchema.findOne({
        _id: placeId,
        isDeleted: false,
        rate: { $ne: null }
    });
    return result;
};
const getNotNull = async (placeId) => {
    const result = await PlaceAccountSchema.find({
        placeId,
        isDeleted: false,
        rating: { $ne: null }
    });
    return result;
};
export default {
    getNotNull,
    getRate,
    updateRate,
    getComment,
    isExistPlace,
    create,
    createRating,
    updateRating,
    getPlaces,
    getPlace,
    updatePlace,
    deletePlace,
    existed,
    createCom,
    countRating,
    countRating1,
    countRating2,
    countRating3,
    countRating4,
    countRating5,
    sumRating,
    insertImage,
    updateImage,
    updateSingle,
    insertMulti,
    getListWithHobbies,
    getPlacesOfDes,
    getPlaces3,
    getPlaces2
};