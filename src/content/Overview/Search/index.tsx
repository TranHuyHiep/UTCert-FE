import { Button, Container, Grid, Input } from "@mui/material";

function Search() {

    return (
        <Container
            maxWidth='lg'
            sx={{
                textAlign: 'center',
            }}
        >
            <h1 style={{color: 'white'}}>YOU CAN FIND CERTS IN HERE!</h1>
            <Grid
                justifyContent="center"
                alignItems="center"
                container
                style={{background: 'rgba(255, 255, 255, 0.3)', padding: '30px', marginTop: '10px', width: '800px', margin: '0 auto'}}
            >
                <Input placeholder="Certificate URL" type="text" style={{width: '550px', fontSize: '20px', backgroundColor: 'white', height:'44px', paddingLeft: '10px'}} />
                <Button style={{background: '#04794a', color: '#ffffff', borderRadius: '0'}}>Search</Button>
            </Grid>
        </Container>
    );
}

export default Search;
