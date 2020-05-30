// -------------------------------------------------------------------
export function addRemoveClasses(e, add: string[], remove: string[]): void {

  if (isArray(add)) {
    add.forEach(x => e.classList.add(x));
  }

  if (isArray(remove)) {
    remove.forEach(x => e.classList.remove(x));
  }
}

// -------------------------------------------------------------------
export function hasValue(e: any): boolean {
  return (e === undefined || e == null || e === '') ? false : true;
}

// -------------------------------------------------------------------
export function isArray(e: any): boolean {
  return (hasValue(e) && e instanceof Array) ? true : false;
}

// -------------------------------------------------------------------
// From da date pattern of 2019-11-21T13:00:00.000Z
// -------------------------------------------------------------------

export function toDateString(msDateString: string): string {
  try {
    const dateSubStr = msDateString.substr(0, 10);
    const dateSplits = dateSubStr.split('-');
    if (dateSplits.length !== 3) {
      return null;
    } else {
      return `${dateSplits[2]}/${dateSplits[1]}/${dateSplits[0]}`;
    }

  } catch {
    return null;
  }
}
