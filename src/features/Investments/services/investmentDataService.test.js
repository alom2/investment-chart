import { fetchInvestmentsDataFromGist } from './investmentDataService'

describe('InvestmentDataService', () => {

  describe('fetchInvestmentsDataFromGist', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it('should handle success calls', async () => {
      const data = ['teste', 'teste']
      fetchMock.mockOnce(JSON.stringify(data))
      const resp = await fetchInvestmentsDataFromGist()
      expect(resp).toStrictEqual(data)
    })

    it('should handle error', async () => {
      fetchMock.mockRejectOnce()
      const resp = await fetchInvestmentsDataFromGist()
      expect(resp).toStrictEqual([])
    })
  })
})