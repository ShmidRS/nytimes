class Api::V1::SendResultsController < ActionController::API

  def create
    ResultsMailer.search_results_mailer(
      params[:email],
      params[:data]
    ).deliver
  end

end
