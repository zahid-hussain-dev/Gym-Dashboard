import React from 'react';
import { useRouter } from 'next/router';
import TaxInflationMain from '../../../../components/ClientInfo/TaxInflationEdit/TaxInflationMain';

const EditId = () => {
  const router = useRouter();
  const Id = router.query.EditId;

  return (
    <div>
      EditId details {Id}
      <TaxInflationMain/>
    </div>
  )
}

export default EditId
