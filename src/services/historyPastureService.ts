import { Prisma } from '@prisma/client';

/**
 * Compares two objects and returns a changes object with only the fields that changed.
 * Example output: { fieldName: { old: x, new: y } }
 */
export function getPastureChanges(
  oldPasture: any,
  newPasture: any,
): Record<string, { old: any; new: any }> {
  const changes: Record<string, { old: any; new: any }> = {};
  for (const key in newPasture) {
    if (Object.prototype.hasOwnProperty.call(newPasture, key)) {
      if (key === 'updatedAt' || key === 'createdAt' || key === 'id' || key === 'farmId') continue;
      if (oldPasture[key] !== newPasture[key]) {
        changes[key] = { old: oldPasture[key], new: newPasture[key] };
      }
    }
  }
  return changes;
}

/**
 * Returns a snapshot of the pasture for history, omitting fields that are not needed.
 */
export function getPastureSnapshotForHistory(pasture: any): Omit<any, 'id' | 'farmId'> {
  // Remove id/farmId, but keep all other fields
  const { id, farmId, ...rest } = pasture;
  return rest;
}
