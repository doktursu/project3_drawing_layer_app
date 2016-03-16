class AssetsController < ApplicationController
  before_action :set_asset, only: [:show, :update, :destroy]

  # GET /assets
  # GET /assets.json
  def index
    @assets = Asset.all

    render json: @assets
  end

  # GET /assets/1
  # GET /assets/1.json
  def show
    render json: @asset
  end

  # POST /assets
  # POST /assets.json
  def create
    puts "params #{params}"
    params[:asset][:objects] = JSON.parse(params[:asset][:objects])

    puts "params after #{params}"
    @asset = Asset.new(asset_params)

    if @asset.save
      render json: @asset, status: 200, location: @asset
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /assets/1
  # PATCH/PUT /assets/1.json
  def update
    @asset = Asset.find(params[:id])

    if @asset.update(asset_params)
      head :no_content
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

  # DELETE /assets/1
  # DELETE /assets/1.json
  def destroy
    if @asset.destroy
      render json: {}, status: 200
    end

    # head :no_content
  end

  private

    def set_asset
      @asset = Asset.find(params[:id])
    end

    def asset_params
      params.require(:asset).permit!#(:name, :objects => [])
    end
end
