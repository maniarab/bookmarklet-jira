/*
  This is the code I initially converted into a bookmarklet using https://caiorss.github.io/bookmarklet-maker/
*/

(function() {
  const expiryDuration = 3 * 1000; // 3 min
  // const expiryDuration = 3 * 60 * 60 * 1000; // 1 hour
  const now = Date.now();
  const localstorageKey = "my-jira-standup";
  const actionsContainerId = "#my-actions-container";
  const origFilterId = "#ghx-operations";
  const origFilterContainerId = "#ghx-rabid";
  const swimlaneClassName = "ghx-swimlane";
  const exitBtnText = "Exit Simplified View";

  const createBtnDiv = text =>
    `<a style="padding:0 10px;" role="button" href="#" data-engineer=${text}>${text}</a>`;

  const createEngineersDom = engineerNames =>
    engineerNames.map(eng => $(createBtnDiv(eng)));

  const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  const hideFilters = () => {
    $(origFilterId).hide();
  };

  const showOrigFilters = () => {
    $(origFilterId).show();
  };

  const addActionsContainer = () => {
    $(actionsContainerId).remove();
    const actionsContainer = $("<div id='my-actions-container'></div>");
    const filterDom = $(
      `<div style="display: flex; padding-left: 10px">Random:&nbsp;</div>`
    );
    createEngineersDom(localStorageModel.randomEngineers).forEach(engDom =>
      filterDom.append(engDom)
    );
    filterDom.append(createBtnDiv("All"));

    const resetBtn = $(`<a role='button' href="#">${exitBtnText}</a>`);
    actionsContainer.append(filterDom);
    actionsContainer.append(resetBtn);
    $(origFilterContainerId).prepend(actionsContainer);
  };

  const reset = () => {
    $(actionsContainerId).remove();
    showOrigFilters();
    swimlanes.show();
  };

  const saveToLocalStorage = (currModel, engName) => {
    localStorageModel.currEngIdx = localStorageModel.randomEngineers.findIndex(
      name => name === engName
    );
    localStorageModel.timestamp = Date.now();
    window.localStorage.setItem(
      localstorageKey,
      JSON.stringify(localStorageModel)
    );
  };

  // main code
  const eng2LaneMap = {};
  Array.from(document.getElementsByClassName(swimlaneClassName)).forEach(
    lane => {
      const engineer = lane.firstChild.ariaLabel
        .split(":")[1]
        .trim()
        .split(" ")[0]
        .toLowerCase();
      const engineerName = `${engineer[0].toUpperCase()}${engineer.slice(1)}`;
      eng2LaneMap[engineerName] = lane;
    }
  );

  const engineers = Object.keys(eng2LaneMap);
  const randomEngineers = shuffle(engineers);
  const prevLocalStorageModelStr = window.localStorage.getItem(localstorageKey);

  const localStorageModel = {
    randomEngineers,
    timestamp: Date.now(),
    currEngIdx: 0
  };

  let prevLocalStorageModel;
  try {
    prevLocalStorageModel = JSON.parse(prevLocalStorageModelStr);
  } catch (error) {
    console.log(
      "previous random engineer list not parseble. Creating new random engineer list."
    );
  }

  if (
    prevLocalStorageModel &&
    prevLocalStorageModel.timestamp &&
    now - prevLocalStorageModel.timestamp < expiryDuration &&
    Array.isArray(prevLocalStorageModel.randomEngineers) &&
    engineers.length === prevLocalStorageModel.randomEngineers.length &&
    prevLocalStorageModel.currEngIdx >= 0
  ) {
    localStorageModel.randomEngineers = prevLocalStorageModel.randomEngineers;
    localStorageModel.timestamp = prevLocalStorageModel.timestamp;
    localStorageModel.currEngIdx = prevLocalStorageModel.currEngIdx;
  }

  const swimlanes = $(`.${swimlaneClassName}`);
  hideFilters();
  swimlanes.hide();
  addActionsContainer();

  // attach click handler
  $(actionsContainerId).on("click", evt => {
    swimlanes.hide();
    const btnTxt = evt?.target?.text;
    const engDom = eng2LaneMap[btnTxt];
    console.log('btn txt: ', btnTxt)
    if (engDom) {
      $(engDom).show();
      saveToLocalStorage(localStorageModel, btnTxt);
    } else if (btnTxt == exitBtnText) {
      reset();
    } else {
      swimlanes.show();
    }
  });

  // show first or active engineer
  $(
    eng2LaneMap[localStorageModel.randomEngineers[localStorageModel.currEngIdx]]
  ).show();
})();
