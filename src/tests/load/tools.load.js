import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export const options = {
    vus: 100,
    duration: '30s',
};

export default function () {
    const response = http.get(`${BASE_URL}/api/tools?category=API_TOOL`);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });
}