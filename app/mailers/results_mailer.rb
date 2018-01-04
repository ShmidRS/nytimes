class ResultsMailer < ApplicationMailer
  default from: 'fsfsegfdsdfds@mail.ru'

  def search_results_mailer(email, search_results)
    mail(to: email, subject: 'You search results.') do |format|
      format.html {
        render locals: { search_results: search_results }
      }
    end
  end
end
