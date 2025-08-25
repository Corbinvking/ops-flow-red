// SoundCloud API Routes (Placeholder)
import { airtableProxy } from '@/server/airtable';
import { AT } from '@/server/airtable.config';

// GET /api/sc/list?view=Active%20Campaigns&offset=
export async function GET(request: Request) {
  const url = new URL(request.url);
  const view = url.searchParams.get('view') || 'All Campaigns';
  const offset = url.searchParams.get('offset');

  try {
    const result = await airtableProxy.listRecords({
      tableId: AT.tables.soundcloud,
      view,
      fieldsById: true,
      offset: offset || undefined
    });

    // Transform Airtable response to our expected format
    const campaigns = result.records.map(record => ({
      id: record.id,
      trackInfo: record.fields[AT.fields.sc.TRACK_INFO],
      client: record.fields[AT.fields.sc.CLIENT],
      service: record.fields[AT.fields.sc.SERVICE],
      goal: record.fields[AT.fields.sc.GOAL],
      remaining: record.fields[AT.fields.sc.REMAINING],
      status: record.fields[AT.fields.sc.STATUS],
      url: record.fields[AT.fields.sc.URL],
      submitDate: record.fields[AT.fields.sc.SUBMIT_DT],
      startDate: record.fields[AT.fields.sc.START_DT],
      receipts: record.fields[AT.fields.sc.RECEIPTS],
      owner: record.fields[AT.fields.sc.OWNER],
      notes: record.fields[AT.fields.sc.NOTES]
    }));

    return Response.json({
      records: campaigns,
      offset: result.offset
    });
  } catch (error) {
    console.error('SC List Error:', error);
    return Response.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

// PATCH /api/sc/record/:id
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const updates = await request.json();

  if (!id) {
    return Response.json({ error: 'Record ID required' }, { status: 400 });
  }

  try {
    // Map our field names to Airtable field IDs
    const airtableFields: Record<string, any> = {};
    
    if (updates.status) airtableFields[AT.fields.sc.STATUS] = updates.status;
    if (updates.owner) airtableFields[AT.fields.sc.OWNER] = updates.owner;
    if (updates.startDate) airtableFields[AT.fields.sc.START_DT] = updates.startDate;
    if (updates.goal) airtableFields[AT.fields.sc.GOAL] = updates.goal;
    if (updates.remaining) airtableFields[AT.fields.sc.REMAINING] = updates.remaining;
    if (updates.notes) airtableFields[AT.fields.sc.NOTES] = updates.notes;

    const result = await airtableProxy.updateRecord({
      tableId: AT.tables.soundcloud,
      id,
      fields: airtableFields,
      typecast: true
    });

    return Response.json({
      id: result.id,
      fields: result.fields,
      updated: true
    });
  } catch (error) {
    console.error('SC Update Error:', error);
    return Response.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

// PATCH /api/sc/bulk
export async function POST(request: Request) {
  const { recordIds, updates } = await request.json();

  if (!recordIds || !Array.isArray(recordIds)) {
    return Response.json({ error: 'Record IDs array required' }, { status: 400 });
  }

  try {
    // Map updates to Airtable field IDs
    const airtableFields: Record<string, any> = {};
    if (updates.status) airtableFields[AT.fields.sc.STATUS] = updates.status;
    if (updates.owner) airtableFields[AT.fields.sc.OWNER] = updates.owner;
    if (updates.startDate) airtableFields[AT.fields.sc.START_DT] = updates.startDate;

    const records = recordIds.map((id: string) => ({
      id,
      fields: airtableFields
    }));

    const result = await airtableProxy.updateRecordsBulk({
      tableId: AT.tables.soundcloud,
      records,
      typecast: true
    });

    return Response.json({
      ok: true,
      batches: result.batches,
      updated: result.records.length
    });
  } catch (error) {
    console.error('SC Bulk Update Error:', error);
    return Response.json({ error: 'Failed to bulk update' }, { status: 500 });
  }
}