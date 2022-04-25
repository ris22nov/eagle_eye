import InfoCards from '../../components/InfoCards';
import { Grid } from '@mui/material';

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'INWARD'} body={"Welcome To Inward"}/>
        </Grid>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'SVS'} body={"Welcome To SVS"}/>
        </Grid>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'CBS'} body={"Welcome To CBS"}/>
        </Grid>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'GLM'} body={"Welcome To GLM"}/>
        </Grid>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'RETURN'} body={"Welcome To Return"}/>
        </Grid>
        <Grid item desktop={2} laptop={4} tablet={6} mobile={12}>
          <InfoCards title={'UNTALLIED'} body={"Welcome To Untallied"}/>
        </Grid>
      </Grid>
  )
}