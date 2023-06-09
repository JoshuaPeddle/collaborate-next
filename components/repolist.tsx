import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';

const columns = [
  {
    field: 'Repo_avatar',
    headerName: 'Logo',
    sortable: false,
    minWidth: 80,
    renderCell: (params:any) => {
      return (
        <Image className='w-10' width={40} height={40} src={params.value} alt={''} />
      );
    },
    flex: 0
  },
  {
    field: 'Repo_name',
    headerName: 'Repo Name',
    minWidth: 150,
    flex: 1.5
  },
  {
    field: 'Repo_owner_name',
    headerName: 'Owner',
    minWidth: 150,
    flex: 1.5
  },
  {
    field: 'Repo_description',
    headerName: 'Description',
    minWidth: 275,
    flex: 3,
    sortable: false,
  },
  {
    field: 'Repo_languages',
    headerName: 'Language',
    minWidth: 110,
    flex: 1
  },
  {
    field: 'Repo_num_issues',
    headerName: 'Issues(recent)',
    minWidth: 110,
    flex: 1,
    renderCell: (params:any) => {
      return (
        <>
          <a className='repo_num_issues' href={params.row.Repo_url + '/issues'}  > {params.value}({params.row.Repo_num_recent_issues}) </a>
        </>
      );
    }
  },
  {
    field: 'Repo_stars',
    headerName: 'Stars',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'Repo_time_since_push_seconds',
    headerName: 'Last push',
    minWidth: 100,
    flex: 1,
    renderCell: (params:any) => {
      return (
        <>
          {params.row.Repo_time_since_push_str}
        </>
      );
    }
  },
  {
    field: 'Repo_url',
    headerName: 'Link',
    width: 50,
    sortable: false,
    renderCell: (params:any) => {
      return (
        <>
          <a className='' href={params.value}  > Link </a>
        </>
      );
    }
  },
];
export default function RepoList ({ repos }:{repos:any}) {
  return (
    <div className='w-screen h-full '  >
      <DataGrid
        density='standard'
        autoPageSize={true}
        rows={repos}
        columns={columns}
        sx={{
          borderRight:0,
          borderLeft:0,
          color: '',
          '& .MuiDataGrid-cell:hover': {
          },
          '& .MuiToolbar-root': {
          },
          '& .MuiDataGrid-footerContainer': {
         
          },
        }}
        className='dark:text-slate-50 '
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}

      />
    </div>
  );
};
