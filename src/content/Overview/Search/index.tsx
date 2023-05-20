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
                style={{background: 'rgba(255, 255, 255, 0.8)', padding: '30px', marginTop: '10px'}}
            >
                <Input type="text" style={{width: '350px', fontSize: '20px'}} />
                <Button style={{background: 'purple', color: 'white' }}>Search</Button>
            </Grid>
        </Container>
    );
}

export default Search;
