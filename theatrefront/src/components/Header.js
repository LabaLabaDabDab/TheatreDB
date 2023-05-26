import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
    return (
        <header>
                <div className="theatre" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="headerInfo">
                        <h3>Театр красный факер имении</h3>
                        <h3>Билли Херрингтона</h3>
                    </div>
                </div>
            <Navbar style={{padding:30, marginTop:0, fontSize:20}} bg="black" variant="dark">
                <Container>
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="me-auto" style={{display: 'flex', flexDirection: 'column'}}>
                        <Nav.Link style={{marginBottom:0}} href="/actors">Актёры</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/authors">Авторы</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/countries">Страны</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/date_of_tour">Дата туров</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/performances">Представления</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/employees">Работники театра</Nav.Link>
                        <Nav.Link style={{marginBottom:0}} href="/tickets">Билеты</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header