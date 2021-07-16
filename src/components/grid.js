// import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

export default function DataGridDemo() {
  const [inventoryRows, setInventoryRows] = useState([]);
  const [inventoryColumns, setInventoryColumns] = useState([]);

  useEffect(() => {
    getInventoryItems();
  }, []);

  const getInventoryItems = async () => {
    const token =
      'WavP64WaIX_a4yiGqyWkmxOEMyppGf6206q_NTzW_ZBNYU9ky07Dh2EEoZGakuyYie6yHvzotsK8-A6QlQB0Pz00gl8zADMQmfsYyqjLBaV9H-cY4hdaXehn9K2JHlA4ExuJzQ312Oi2Xr0-KarxWne0LJesIIPd0ufkow6IFv_qP2aZkoVSNGdnR2zV6kv44ntHRI6ACXJpZHocWioGEeBF2MN5iqrHD4pjXsctTIE3L_YcLUa0EK5HXLCflkqwLJSfkHassmRkw2loyN198Bmx6hyvlihnCi6cv3WdjYrFabsnZrxZ_HtD5Vfq0qvE-UpUVA0qL0CkVOEBqWklA5HzUiBEN1N4lYAXT79hzzZ9w2-3SfuhQ6-fdcoRKvKE';
    const headers = { Authorization: `Bearer ${token}` };
    const data = {
      salesPersonId: '2',
      customerUid: '0',
      orderId: '0',
      categoryId: '0',
      subCategoryId: '0',
      pageNo: 1,
      noOfItems: 50,
      type: 'All',
      subType: 'All',
      searchString: 'nullempty',
    };

    const { data: items } = await axios.post(
      'https://salesprodev.curtze.com:86/api/v2/categoryInventory/',
      data,
      { headers }
    );

    const inventoryColumns = Object.keys(items[0]).map((itemKey) => {
      return { field: itemKey, headerName: itemKey.toUpperCase(), width: 90 };
    });

    const inventoryRows = items.map((item, index) => {
      return { ...{ id: index }, ...item };
    });

    setInventoryColumns(inventoryColumns);
    setInventoryRows(inventoryRows);
  };

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid rows={inventoryRows} columns={inventoryColumns} pageSize={25} />
    </div>
  );
}
