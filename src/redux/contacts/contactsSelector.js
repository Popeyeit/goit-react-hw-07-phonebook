import { createSelector } from 'reselect';
export const contactsSelector = state => state.contacts;
export const itemsSelector = state => contactsSelector(state).items;
export const filterSelector = state => contactsSelector(state).filter;
export const FilteredItemsSelector = createSelector(
  [itemsSelector, filterSelector],
  (items, filterValue) =>
    filterValue
      ? items.filter(item => {
          return item.name.toLowerCase().includes(filterValue.toLowerCase());
        })
      : items,
);
export const errorSelector = state => contactsSelector(state).error;
export const isNameSelector = state =>
  contactsSelector(state).hasNameInContacts;
export const isLoadingSelector = state => contactsSelector(state).loader;
