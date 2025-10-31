import { faker } from "@faker-js/faker";

export function generateCustomers(count = 1000000) {
  return Array.from({ length: count }, (_, idx) => ({
    id: idx + 1,
    name: faker.person.fullName(),
    phone: faker.phone.number("+91##########"),
    email: faker.internet.email(),
    score: faker.number.int({ min: 0, max: 100 }),
    lastMessageAt: faker.date.recent({ days: 120 }).toISOString(),
    addedBy: faker.person.fullName(),
    avatar: faker.image.avatar(),
  }));
}
