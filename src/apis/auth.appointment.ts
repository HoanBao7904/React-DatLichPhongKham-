import http from 'src/utils/http'

const AppointMent = {
  getAllApointment() {
    return http.get('api/appointments/me')
  }
}
export default AppointMent
