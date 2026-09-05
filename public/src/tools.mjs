export const evaluators={
  'call-sheet-completeness-checker': i=>{const c=i.callSheet||{},fields=['date','generalCall','location','contacts','scenes','safety','distribution'],missing=fields.filter(f=>c[f]==null||(Array.isArray(c[f])&&!c[f].length)||c[f]==='');return{valid:!missing.length,missing,completeFields:fields.length-missing.length}},
  'turnaround-window-validator': i=>{const min=Number(i.minimumHours),rows=(i.people||[]).map(p=>{const hours=(Date.parse(p.nextCall)-Date.parse(p.wrap))/36e5;return{name:p.name,hours:+hours.toFixed(2),shortfall:Math.max(0,min-hours)}});return{valid:min>0&&rows.length>0&&rows.every(x=>x.shortfall===0),rows}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
