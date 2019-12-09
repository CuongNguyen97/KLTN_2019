import { VerifyToken } from '../../../utils/jwt.util';
import { AccountRole } from '../../account-module/commons/account-status.common';
import PlaceRepository from '../repositories/place.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import AccountRepository from '../../account-module/repositories/account.repository';
import {
    CreatePlaceErrors,
    CreateRatingCommentErrors,
    GetPlacesErrors,
    GetPlaceErrors,
    GetRateCommentErrors,
    UpdatePlaceErrors,
    DeletePlaceErrors,
    InsertImageErrors,
    UpdateImageErrors,
    UpdateSingleImageErrors,
    InsertMultiImageErrors,
    GetPlacesOfDesErrors
} from '../error-codes/place.error-codes';

const create = async (req, res) => {
    const { jwt } = req.headers;
    const {
        name,
        category,
        location,
        phone,
        description,
        price,
        longitude,
        latitude,
        destinationId
    } = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreatePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(CreatePlaceErrors.NO_RIGHT);
        const isExist = await PlaceRepository.isExistPlace(name);
        if (isExist) throw new AlreadyExistError(CreatePlaceErrors.PLACE_ALREADY_EXIST);
        const place = await PlaceRepository.create({
            name,
            category,
            location,
            phone,
            description,
            price,
            longitude,
            latitude,
            destinationId
        });
        if (!place) throw new NotImplementError(CreatePlaceErrors.CREATE_FAIL);
        return res.onSuccess(place);
    } catch (error) {
        return res.onError(error);
    }
};
const createRaCom = async (req, res) => {
    const {
        jwt,
        placeId,
        rating,
        comment
    } = req.body;
    try {
        let result;
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateRatingCommentErrors.AUTH_FAIL);
        const { accountId } = authenData.accountId;
        const account = await AccountRepository.getAccountById(accountId);
        if (!account) throw new NotFoundError(CreateRatingCommentErrors.ACCOUNT_NEVER_EXIST);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(CreateRatingCommentErrors.PLACE_NEVER_EXIST);
        const existed = await PlaceRepository.existed(placeId, accountId);
        if (!existed) {
            result = await PlaceRepository.createRaCom({
                placeId,
                accountId,
                rating,
                comment
            });
            if (!result) throw new NotImplementError(CreateRatingCommentErrors.CREATE_FAIL);
        } else if (rating) {
                if (comment) {
                    const update = await PlaceRepository.updateRaCom({
 placeId, accountId, rating, comment
});
                    if (!update) throw new NotImplementError(CreateRatingCommentErrors.UPDATE_RATING_COMMNENT_FAILURE);
                    result = await PlaceRepository.existed(placeId, accountId);
                    if (!result) throw new NotFoundError(CreateRatingCommentErrors.GET_FAIL);
                } else {
                    const update = await PlaceRepository.updateRa({ placeId, accountId, rating });
                    if (!update) throw new NotImplementError(CreateRatingCommentErrors.UPDATE_RATING_FAILURE);
                    result = await PlaceRepository.existed(placeId, accountId);
                    if (!result) throw new NotFoundError(CreateRatingCommentErrors.GET_FAIL);
                }
                // update rate
                const count = await PlaceRepository.countRating();
                if (!count) throw new NotImplementError(CreateRatingCommentErrors.COUNT_FAILURE);
                const amount = await PlaceRepository.sumRating();
                if (!amount) throw new NotImplementError(CreateRatingCommentErrors.AMOUNT_RATING_FAILURE);
            } else {
                const update = await PlaceRepository.updateCom({ placeId, accountId, comment });
                if (!update) throw new NotImplementError(CreateRatingCommentErrors.UPDATE_COMMENT_FAILURE);
                result = await PlaceRepository.existed(placeId, accountId);
                if (!result) throw new NotFoundError(CreateRatingCommentErrors.GET_FAIL);
            }
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlaces = async (req, res) => {
    try {
        const places = await PlaceRepository.getPlaces();
        if (!places) throw new NotFoundError(GetPlacesErrors.GET_FAIL);
        const result = places.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.send({
            data: result,
            success: 'ok'
        });
    } catch (error) {
        return res.onError(error);
    }
};
const getPlace = async (req, res) => {
    const placeId = req.params.id;
    try {
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(GetPlaceErrors.GET_FAIL);
        return res.onSuccess({
            _id: place._id,
            name: place.name,
            rate: place.rate,
            category: place.category,
            location: place.location,
            phone: place.phone,
            description: place.description,
            price: place.price,
            longitude: place.longitude,
            latitude: place.latitude,
            destinationId: place.destinationId,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const getComment = async (req, res) => {
    const placeId = req.params.id;
    try {
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(GetRateCommentErrors.PLACE_NEVER_EXIST);
        const result = await PlaceRepository.getComment(placeId);
        if (!result) throw new NotImplementError(GetRateCommentErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updatePlace = async (req, res) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdatePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdatePlaceErrors.NO_RIGHT);
        const isExisted = await PlaceRepository.getPlace(placeId);
        if (!isExisted) throw new NotFoundError(UpdatePlaceErrors.PLACE_NEVER_EXIST);
        const update = await PlaceRepository.updatePlace(placeId, data);
        if (!update) throw new NotImplementError(UpdatePlaceErrors.UPDATE_FAIL);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdatePlaceErrors.GET_FAIL);
        return res.onSuccess({
            _id: place._id,
            name: place.name,
            category: place.category,
            location: place.location,
            phone: place.phone,
            description: place.description,
            price: place.price,
            longitude: place.longitude,
            latitude: place.latitude,
            destinationId: place.destinationId,
        });
    } catch (error) {
        return res.onError(error);
    }
};
const deletePlace = async (req, res) => {
    const { jwt } = req.headers;
    const placeId = req.params.id;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(DeletePlaceErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(DeletePlaceErrors.NO_RIGHT);
        const isExisted = await PlaceRepository.getPlace(placeId);
        if (!isExisted) throw new NotFoundError(DeletePlaceErrors.PLACE_NEVER_EXIST);
        const result = await PlaceRepository.deletePlace(placeId);
        if (!result) throw new NotImplementError(DeletePlaceErrors.DELETE_FAIL);
        return res.onSuccess({ message: result });
    } catch (error) {
        return res.onError(error);
    }
};
const insertImage = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.file.path;
    req.body = { images };
    // console.log(images);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(InsertImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(InsertImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(InsertImageErrors.PLACE_NEVER_EXIST);
        const arrays = place.images;
        const array = arrays.map(async (arr) => {
            if (arr === req.body.images) throw new AlreadyExistError(InsertImageErrors.SAME_IMAGE);
        });
        await Promise.all(array);
        const upload = await PlaceRepository.insertImage(placeId, req.body.images);
        if (!upload) throw new NotImplementError(InsertImageErrors.INSERT_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(InsertImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateImage = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.files;
    const image = images.map((i) => {
        return i.path;
    });
    await Promise.all(image);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UpdateImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdateImageErrors.PLACE_NEVER_EXIST);
        // const arrays = place.images;
        // const array = arrays.map(async (arr) => {
        //     if (arr === req.body.images) throw new AlreadyExistError(UpdateImageErrors.SAME_IMAGE);
        // });
        // await Promise.all(array);
        const upload = await PlaceRepository.updateImage(placeId, image);
        if (!upload) throw new NotImplementError(UpdateImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(UpdateImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const updateSingle = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId, oldImage } = req.body;
    const images = req.file.path;
    req.body = { oldImage, images };
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(UpdateSingleImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(UpdateSingleImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(UpdateSingleImageErrors.PLACE_NEVER_EXIST);
        const arrays = place.images;
        const array = arrays.map(async (arr) => {
            if (arr === req.body.images) throw new AlreadyExistError(UpdateSingleImageErrors.SAME_IMAGE);
        });
        await Promise.all(array);
        const upload = await PlaceRepository.updateSingle(placeId, req.body.oldImage, req.body.images);
        if (!upload) throw new NotImplementError(UpdateSingleImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(UpdateSingleImageErrors.GET_FAIL);
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};
const insertMulti = async (req, res) => {
    const { jwt } = req.headers;
    const { placeId } = req.body;
    const images = req.files;
    const image = images.map((i) => {
        return i.path;
    });
    await Promise.all(image);
    try {
        const authenData = VerifyToken(jwt);
        if (!jwt) throw new NotImplementError(InsertMultiImageErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.MANAGER) throw new Unauthorized(InsertMultiImageErrors.NO_RIGHT);
        const place = await PlaceRepository.getPlace(placeId);
        if (!place) throw new NotFoundError(InsertMultiImageErrors.PLACE_NEVER_EXIST);
        // const arrays = place.images;
        // const array = arrays.map(async (arr) => {
        //     if (arr === req.body.images) throw new AlreadyExistError(InsertMultiImageErrors.SAME_IMAGE);
        // });
        // await Promise.all(array);
        const names = images.map((i) => {
            const name = i.filename;
            const url = 'localhost:3000/uploads';
            const y = { name, url };
            return y;
        });
        await Promise.all(names);
        const upload = await PlaceRepository.insertMulti(placeId, image);
        if (!upload) throw new NotImplementError(InsertMultiImageErrors.UPDATE_FAILURE);
        const result = await PlaceRepository.getPlace(placeId);
        if (!result) throw new NotImplementError(InsertMultiImageErrors.GET_FAIL);
        return res.onSuccess(names);
    } catch (error) {
        return res.onError(error);
    }
};
const getPlacesOfDes = async (req, res) => {
    const destinationId = req.params.id;
    try {
        const places = await PlaceRepository.getPlacesOfDes(destinationId);
        if (!places) throw new NotFoundError(GetPlacesOfDesErrors.GET_FAILURE);
        const result = places.map((place) => {
            const placeInfo = {};
            placeInfo._id = place._id;
            placeInfo.name = place.name;
            placeInfo.rate = place.rate;
            placeInfo.category = place.category;
            placeInfo.location = place.location;
            placeInfo.phone = place.phone;
            placeInfo.description = place.description;
            placeInfo.price = place.price;
            placeInfo.images = place.images;
            placeInfo.longitude = place.longitude;
            placeInfo.latitude = place.latitude;
            placeInfo.destinationId = place.destinationId;
            return placeInfo;
        });
        return res.onSuccess(result);
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create,
    createRaCom,
    getPlaces,
    getPlace,
    getComment,
    updatePlace,
    deletePlace,
    insertImage,
    updateImage,
    updateSingle,
    insertMulti,
    getPlacesOfDes
};