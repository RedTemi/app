import React from 'react';

function fComp(Comp) {
  function component() {
    return (
      <Comp />
    );
  }
  return component;
}

export default fComp;
