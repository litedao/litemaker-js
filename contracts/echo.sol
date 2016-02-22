contract Echo {
  function () returns (bytes) {
    return msg.data;
  }
}
