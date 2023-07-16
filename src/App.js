import './App.css';
import { useEffect, useState } from 'react';
// components
import FormProvider from './components/hook-form/FormProvider';
import RHFTextField from './components/hook-form/RHFTextField';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Box, IconButton, Typography, Stack, Card, CardHeader, CardContent} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha } from '@mui/material/styles';
// Axios
import _axios from 'axios';
import background from './assets/bg-light.png'
import img from './assets/sun.png'
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 700,
  height: '100vh',
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

// ----------------------------------------------------------------------
export async function getStaticProps() {
  return {
    props: {}
  };
}

export default function App(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [weather, setWeather] = useState();
  const [weatherList, setWeatherList] = useState([]);

  const FormSchema = Yup.object().shape({
    locale: Yup.string()
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const remove = (key) => {
    const updatedDataObject = { ...weatherList };
    delete updatedDataObject[key];
    setWeatherList(updatedDataObject);
  };

  const onSubmit = async (data) => {
    await _axios
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          units: 'metric',
          q: data.country,
          appid: process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        setWeather(res.data);
        // Set the key dynamically
        const dynamicKey = res.data.name;
        const dynamicValue = res.data;
        weatherList[dynamicKey] = dynamicValue;
        // Check if data already exist in weatherList
        if (!weatherList[res.data.name]) {
          setWeatherList(weatherList)
        }
      })
      .catch((error) => {
        // Show error messsage from bad request
        window.alert(error.response.data.message);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${background})`, position: 'relative' }}>
      <ContentStyle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <CardHeader
              sx={{ p:0 }}
              action={
                <IconButton sx={{ p: 3 }} aria-label="settings" type="submit" id="submitButton">
                  <SearchIcon />
                </IconButton>
              }
              title={
                <RHFTextField
                  InputProps={{ sx: { borderRadius: 5 } }}
                  sx={{ 
                    mr: 5,
                    background: alpha('#fff', 0.2),
                    borderRadius: 5
                  }}
                  name="country"
                  label="Country"
                />
              }
            />
          </Card>
        </FormProvider>
        <Box sx={{ my: 5}}>
          <Card sx= {{ borderRadius: 5, background: alpha('#fff', 0.2), marginTop: 11 }}>
            <CardContent>
            {weather && <>
              {isSmallScreen ? 
                <>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        Today's Weather
                      </Typography>
                      <Typography variant="h2" color="#6D28AD" style={{ fontWeight: 'bold' }}>
                        {Number(weather.main.temp.toFixed(0))}°
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        H:{Number(weather.main.temp_max.toFixed(0))}° L:{Number(weather.main.temp_min.toFixed(0))}°
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        {weather.name}, {weather.sys.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 'auto' }}>
                      <Stack spacing={1}>
                        <Typography variant="body2" align="right"> 
                          Coulds
                        </Typography>
                        <Typography variant="body2" align="right">
                          Humidity: {weather.main.humidity}%
                        </Typography>
                      </Stack>
                    </Grid>
                    <Box
                        component="img"
                        sx={{
                          height: 160,
                          width: 160,
                          position: 'absolute',
                          zIndex: 9999,
                          top: '100px',
                          left: '190px'
                        }}
                        src={img}
                      />
                  </Grid>
                </>:<>
                  <Grid container >
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Today's Weather
                      </Typography>
                      <Typography variant="h1" color="#6D28AD" sx={{ fontWeight: 'bold' }}>
                        {Number(weather.main.temp.toFixed(0))}°
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        H:{Number(weather.main.temp_max.toFixed(0))}° L:{Number(weather.main.temp_min.toFixed(0))}°
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        component="img"
                        sx={{
                          height: 280,
                          width: 300,
                          position: 'absolute',
                          zIndex: 9999,
                          top: '100px'
                        }}
                        src={img}
                      />
                    </Grid>
                  </Grid>
                  <Grid container >
                    <Grid item xs={3}>
                      <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body1', xs: 'body2' } }}>
                        {weather.name}, {weather.sys.country}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ margin: 'auto', typography: { sm: 'body1', xs: 'body2' } }}>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ margin: 'auto', typography: { sm: 'body1', xs: 'body2' } }}>
                        Humidity: {weather.main.humidity}%
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ margin: 'auto', typography: { sm: 'body1', xs: 'body2' } }}> 
                        Coulds
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              }
            </>}
              <Card sx= {{ borderRadius: 5, my: 5, background: alpha('#fff', 0.2) }}>
                <CardHeader title={
                  <Typography sx={{ sm: 'body1', xs: 'body2' }}>
                    Search History
                  </Typography>
                }>
                </CardHeader>
                <CardContent>
                  <Stack spacig={2}>
                    {Object.entries(weatherList).map(([key, item]) => (
                      <Card sx= {{ borderRadius: 5, mb: 3, background: alpha('#fff', 0.5) }} key={key}>
                        <CardContent sx= {{ p:2, '&:last-child': { pb: 2 } }}>
                          <Grid container>
                            <Grid item xs={8}>
                              <Box display="flex" justifyContent="flex-center">
                                <Typography>
                                  {item.name}, {item.sys.country}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box display="flex" justifyContent="flex-end">
                                <IconButton 
                                  sx= {{ p:0, mr:3 }}
                                  onClick={() => {
                                    onSubmit({country: key});
                                  }}
                                >
                                  <SearchIcon />
                                </IconButton>
                                <IconButton 
                                  sx= {{ p:0 }}
                                  onClick={() => {
                                    remove(key);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Box>
      </ContentStyle>
    </div>
  );
}

