/**
 * Created by piccosoft on 21/6/19.
 */
import {AppState} from '../../../../app.state.interface';
import {createSelector} from 'reselect';
import * as fromServiceCategory from './serviceCategory.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getServiceCategoryState = (state: AppState) => state.serviceCategory;


export const getServiceCategoryList = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesList);
export const getServiceCategoryListCount = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesListCount);
export const getServiceCategoryListFilter = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesListFilter);
export const getServiceCategoryAdd = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesAdd);
export const getServiceCategoryUpdate = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesUpdate);
export const getServiceCategoryDelete = createSelector(getServiceCategoryState, fromServiceCategory.getServiceCategoriesDelete);
export const getServicecategoryRemoveLists = createSelector(getServiceCategoryState, fromServiceCategory.getServicecategoryRemoveLists);

export const categoryDetails = createSelector(getServiceCategoryState, fromServiceCategory.categoryDetails);
export const categoryDetailsLoading = createSelector(getServiceCategoryState, fromServiceCategory.categoryDetailsLoading);
export const categoryDetailsLoaded = createSelector(getServiceCategoryState, fromServiceCategory.categoryDetailsLoaded);
export const categoryDetailsFailed = createSelector(getServiceCategoryState, fromServiceCategory.categoryDetailsFailed);
