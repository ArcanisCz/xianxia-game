/* eslint-disable no-undef,no-console */
console.log(`%cversion: %c${VERSION.VERSION}`, "font-weight: normal", "font-weight: bold");
console.log(`%ccommit: %c${VERSION.HASH}`, "font-weight: normal", "font-weight: bold");
console.log(`%cdate: %c${new Date(VERSION.DATE).toISOString()}`, "font-weight: normal", "font-weight: bold");
/* eslint-enable */
