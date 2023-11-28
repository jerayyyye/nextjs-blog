const SUBGRADES = [
    "MX 13 equiv",
    "MX 12 equiv",
    "MX 11 equiv",
    "MX 10 equiv",
    "MX 9 equiv",
    "MX 8 equiv",
  ];
  
  export const subgrades = (config: any) => {
    const cfg = config || {};
    const count = cfg.count || 6;
    const section = cfg.section;
    const values = [];
    let i, value;
  
    for (i = 0; i < count; ++i) {
      value = SUBGRADES[Math.ceil(i) % 6];
      values.push(value.substring(0, section));
    }
  
    return values;
  };