export const fetchInvestmentsDataFromGist = async () => {
  const response = await fetch('https://gist.githubusercontent.com/AgtLucas/a67c345e15c2eb3d4668c9b7e330ac44/raw/1de2450cbe69fde065bca9e498aaaaafcca61257/mock-data.js')
  return await response.json()
}
