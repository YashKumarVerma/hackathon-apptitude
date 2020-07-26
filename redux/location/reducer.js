import Types from "./types";

const INITIAL_STATE = {
  locationPoints: [],
  lastUpdated: 0,
  currentLocation: {
    latitude:0,
    longitude:0
  }
};

const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // push more data into app locations tate
    case Types.PUSH_LOCATION: {
        const currentTenSecondInterval = Date.now()%10000000000
        if(state.lastUpdated - currentTenSecondInterval >= 10){
            console.log("Updating Time and saving location")
            return Object.assign({}, state, {
              locationPoints: [...state.locationPoints, action.payload],
              lastUpdated = currentTenSecondInterval
            });
        }else{
            return state
        }
    }

    case Types.CURRENT_LOCATION: {
        console.log(action.payload)
        return Object.assign({}, state, {
            currentLocation: {...action.payload}
        });
    }


    default:
      return state;
  }
};

export default EventReducer;
