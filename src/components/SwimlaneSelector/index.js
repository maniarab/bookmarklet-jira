import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SwimlaneSelector = () => {
  const [swimlanes, setSwimlanes] = useState([]);
  const [engToSwimlaneMap, setEngToSwimlaneMap] = useState({});
  const [selectedEngineers, setSelectedEngineers] = useState(['All']);
  const [anchorEl, setAnchorEl] = useState(null);

  const buildEngToSwimlaneMap = useCallback(() => {
    const map = {};
    swimlanes.forEach((swimlane) => {
      const ariaLabel = swimlane.getAttribute('aria-label');
      if (ariaLabel) {
        const parts = ariaLabel.split(':');
        if (parts.length > 1) {
          const engineerName = parts[1].trim();
          map[engineerName] = swimlane;
        }
      }
    });
    setEngToSwimlaneMap(map);
  }, [swimlanes]);

  const hideJiraFilters = useCallback(() => {
    const operationsElement = document.getElementById('ghx-operations');
    if (operationsElement) {
      operationsElement.style.display = 'none';
    }
  }, []);

  const hideAllSwimlanes = useCallback(() => {
    swimlanes.forEach((swimlane) => {
      swimlane.style.display = 'none';
    });
  }, [swimlanes]);

  const showSwimlane = useCallback((engineerName) => {
    hideAllSwimlanes();
    if (engToSwimlaneMap[engineerName]) {
      engToSwimlaneMap[engineerName].style.display = '';
    }
  }, [engToSwimlaneMap, hideAllSwimlanes]);

  const handleCheckboxChange = useCallback((engineerName) => {
    setSelectedEngineers((prevSelected) => {
      if (engineerName === 'All') {
        return ['All'];
      } else {
        const isSelected = prevSelected.includes(engineerName);
        if (isSelected) {
          return prevSelected.filter((name) => name !== engineerName);
        } else {
          return prevSelected.filter((name) => name !== 'All').concat(engineerName);
        }
      }
    });
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const collectedSwimlanes = Array.from(document.querySelectorAll('.ghx-swimlane'));
    setSwimlanes(collectedSwimlanes);
  }, []);

  useEffect(() => {
    if (swimlanes.length > 0) {
      buildEngToSwimlaneMap();
      hideJiraFilters();
      hideAllSwimlanes();
    }
  }, [swimlanes, buildEngToSwimlaneMap, hideJiraFilters, hideAllSwimlanes]);

  const engineerNames = Object.keys(engToSwimlaneMap);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMenuClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Engineers
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedEngineers.includes('All')}
                  onChange={() => handleCheckboxChange('All')}
                />
              }
              label="All"
            />
          </MenuItem>
          {engineerNames.map((engineerName, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedEngineers.includes(engineerName)}
                    onChange={() => handleCheckboxChange(engineerName)}
                  />
                }
                label={engineerName}
              />
            </MenuItem>
          ))}
        </Menu>
      </div>
      {engineerNames.map((engineerName, index) => (
        <Button
          key={index}
          variant="contained"
          color="secondary"
          style={{ marginLeft: '8px' }}
          onClick={() => showSwimlane(engineerName)}
        >
          {engineerName}
        </Button>
      ))}
    </div>
  );
};

export default SwimlaneSelector;