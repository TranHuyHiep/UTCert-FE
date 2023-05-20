import { Button, Container, Grid, Input } from "@mui/material";

function Search() {

    return (
        <Container
            maxWidth="lg"
            sx={{
                textAlign: 'center',
            }}
        >
            <h1 style={{color: 'white'}}>You can find cert in here</h1>
            <Grid
                spacing={{ xs: 6, md: 10 }}
                justifyContent="center"
                alignItems="center"
                container
                style={{background: 'rgba(255, 255, 255, 0.8)', padding: '30px', marginTop: '10px'}}
            >
                <Input type="text" style={{width: '300px'}} />
                <Button style={{background: 'purple', color: 'white' }}>Search</Button>
            </Grid>
        </Container>
    );
}

export default Search;
