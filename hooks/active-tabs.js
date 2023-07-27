import React from 'react'

const useActiveTabs = (array,name) => {

    const activeTabsArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].name == name) {
        activeTabsArray.push(array[i].name);
        break;
      } else {
        activeTabsArray.push(array[i].name);
      }
    }
  return activeTabsArray
}

export default useActiveTabs