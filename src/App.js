import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouterLink,
} from 'react-router-dom'
import VolumeSection from './components/VolumeSection'
import EQSection from './components/EQSection'
import Home from './components/Home'
import {
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Container,
  List,
  ListItem,
} from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})
function App() {
  const [connected, setConnected] = useState(false) // 서버 연결 상태 표현을 위한 상태
  const [clientCount, setClientCount] = useState(0) // 접속된 클라이언트 수를 저장할 상태를 추가합니다.

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      console.log('connected to server')
    }

    ws.onmessage = (message) => {
      console.log('received: %s', message.data)
      const data = JSON.parse(message.data) // 서버로부터 받은 메시지를 파싱합니다.
      if (data.clients !== undefined) {
        setClientCount(data.clients) // 접속된 클라이언트 수를 업데이트합니다.
        setConnected(data.clients > 0) // 클라이언트 수에 따라 연결 상태를 설정합니다.
      }
    }

    ws.onclose = () => {
      console.log('disconnected from server')
      setConnected(false) // 연결이 끊어진 경우 상태를 false로 변경합니다.
    }

    return () => {
      ws.close()
    }
  }, [])

  const serverStart = async () => {
    try {
      const response = await axios.get('http://localhost:3001/start')
      console.log(response.data)
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  const serverStop = async () => {
    try {
      const response = await axios.get('http://localhost:3001/stop')
      console.log(response.data)
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          className="App"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
                접속된 클라이언트 수: {clientCount}
              </Typography>
              <Button
                variant="contained"
                onClick={serverStart}
                disabled={connected}
                color="primary"
              >
                접속
              </Button>
              <Button
                variant="contained"
                onClick={serverStop}
                color="secondary"
              >
                서버 종료
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              bgcolor: 'background.default',
            }}
          >
            <Box
              component="nav"
              sx={{
                width: '200px',
                bgcolor: 'grey.900',
                color: 'white',
                p: '20px',
              }}
            >
              <List>
                <ListItem>
                  <MuiLink
                    to="/"
                    component={RouterLink}
                    underline="none"
                    color="text.primary"
                  >
                    Home
                  </MuiLink>
                </ListItem>
                <ListItem>
                  <MuiLink
                    to="/volume"
                    component={RouterLink}
                    underline="none"
                    color="text.primary"
                  >
                    Volume
                  </MuiLink>
                </ListItem>
                <ListItem>
                  <MuiLink
                    to="/peq"
                    component={RouterLink}
                    underline="none"
                    color="text.primary"
                  >
                    PEQ
                  </MuiLink>
                </ListItem>
              </List>
            </Box>
            <Container
              component="main"
              sx={{ flexGrow: 1, p: '1em', bgcolor: 'background.default' }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/volume"
                  element={<VolumeSection clientCount={clientCount} />}
                />
                <Route path="/peq" element={<EQSection />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
