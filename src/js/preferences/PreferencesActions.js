
import PConstants from './PConstants'
let AppDispatcher = require('./../dispatcher/AppDispatcher')

class PreferencesActions {

  updatePreferences() {
    AppDispatcher.dispatch({
      type: PConstants.ACTIONS.POST_PREFERENCES
    })
  }
}

let preferencesActions = new PreferencesActions()
export default preferencesActions